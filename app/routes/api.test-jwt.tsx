import type { LoaderFunctionArgs } from 'react-router';

// Base64URL encode function for JWT
function base64URLEncode(str: ArrayBuffer): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Generate JWT token using EXACT KlingAI format from their Python example
async function generateKlingTokenExact(ak: string, sk: string): Promise<string> {
  if (!ak || !sk) {
    throw new Error('KlingAI API credentials not configured');
  }

  // EXACT format from KlingAI Python example
  const headers = {
    "alg": "HS256",
    "typ": "JWT"
  };

  const currentTime = Math.floor(Date.now() / 1000);
  const payload = {
    "iss": ak,
    "exp": currentTime + 1800,  // current time + 1800s (30min)
    "nbf": currentTime - 5      // current time - 5s
  };

  console.log('🔧 JWT Generation (KlingAI format):', {
    currentTime,
    payload,
    headers
  });

  // Encode header and payload
  const encodedHeader = base64URLEncode(new TextEncoder().encode(JSON.stringify(headers)));
  const encodedPayload = base64URLEncode(new TextEncoder().encode(JSON.stringify(payload)));
  
  // Create signature using Web Crypto API
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(sk),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const encodedSignature = base64URLEncode(signature);
  
  const token = `${data}.${encodedSignature}`;
  
  console.log('🔧 Generated JWT details:', {
    headerLength: encodedHeader.length,
    payloadLength: encodedPayload.length,
    signatureLength: encodedSignature.length,
    totalLength: token.length,
    headerDecoded: headers,
    payloadDecoded: payload
  });

  return token;
}

// Alternative implementation with different JSON stringification
async function generateKlingTokenAlternative(ak: string, sk: string): Promise<string> {
  const headers = { alg: "HS256", typ: "JWT" };
  const currentTime = Math.floor(Date.now() / 1000);
  const payload = { iss: ak, exp: currentTime + 1800, nbf: currentTime - 5 };

  // Try different JSON stringification (no spaces, sorted keys)
  const headerJson = JSON.stringify(headers, Object.keys(headers).sort());
  const payloadJson = JSON.stringify(payload, Object.keys(payload).sort());

  const encodedHeader = base64URLEncode(new TextEncoder().encode(headerJson));
  const encodedPayload = base64URLEncode(new TextEncoder().encode(payloadJson));
  
  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(sk),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const encodedSignature = base64URLEncode(signature);
  
  return `${data}.${encodedSignature}`;
}

async function testKlingEndpoint(url: string, token: string, method: string = 'GET', body?: any, testName?: string) {
  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'HydrogenApp/1.0',
      'Accept': 'application/json'
    };

    const options: RequestInit = {
      method,
      headers
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    console.log(`🧪 ${testName || 'Testing'} ${method} ${url}`);

    const response = await fetch(url, options);
    
    let responseData: any = {};
    const responseText = await response.text();
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { rawResponse: responseText };
    }

    console.log(`📊 ${testName || 'Response'} ${response.status} ${response.statusText}:`, responseData);

    return {
      testName,
      url,
      method,
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      success: response.status === 200
    };
  } catch (error) {
    console.error(`❌ Error in ${testName}:`, error);
    return {
      testName,
      url,
      method,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function loader({ context }: LoaderFunctionArgs) {
  try {
    const KLING_ACCESS_KEY = context.env.KLING_ACCESS_KEY as string | undefined;
    const KLING_SECRET_KEY = context.env.KLING_SECRET_KEY as string | undefined;

    console.log('🔧 KlingAI Reference Implementation Test:', {
      hasAccessKey: !!KLING_ACCESS_KEY,
      accessKeyLength: KLING_ACCESS_KEY?.length || 0,
      hasSecretKey: !!KLING_SECRET_KEY,
      secretKeyLength: KLING_SECRET_KEY?.length || 0,
    });

    if (!KLING_ACCESS_KEY || !KLING_SECRET_KEY) {
      return new Response(JSON.stringify({
        error: 'KlingAI credentials not found'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Test multiple JWT generation approaches
    console.log('🚀 Testing multiple JWT generation approaches...');
    
    const token1 = await generateKlingTokenExact(KLING_ACCESS_KEY, KLING_SECRET_KEY);
    const token2 = await generateKlingTokenAlternative(KLING_ACCESS_KEY, KLING_SECRET_KEY);

    console.log('🔍 Comparing JWT tokens:', {
      token1Length: token1.length,
      token2Length: token2.length,
      tokensMatch: token1 === token2,
      token1Preview: token1.substring(0, 50) + '...',
      token2Preview: token2.substring(0, 50) + '...'
    });

    // Test both tokens against KlingAI API
    const testResults = await Promise.all([
      testKlingEndpoint(
        'https://api-singapore.klingai.com/v1/images/generations?pageNum=1&pageSize=1', 
        token1, 
        'GET', 
        undefined, 
        'Exact KlingAI Format'
      ),
      testKlingEndpoint(
        'https://api-singapore.klingai.com/v1/images/generations?pageNum=1&pageSize=1', 
        token2, 
        'GET', 
        undefined, 
        'Alternative Format'
      ),
      testKlingEndpoint(
        'https://api-singapore.klingai.com/v1/images/kolors-virtual-try-on', 
        token1, 
        'GET', 
        undefined, 
        'Virtual Try-On (Exact)'
      ),
      testKlingEndpoint(
        'https://api-singapore.klingai.com/v1/images/kolors-virtual-try-on', 
        token2, 
        'GET', 
        undefined, 
        'Virtual Try-On (Alt)'
      )
    ]);

    // Detailed JWT analysis for both tokens
    const analyzeJWT = (token: string, name: string) => {
      const [headerB64, payloadB64, signature] = token.split('.');
      
      const decodeBase64 = (str: string) => {
        const padded = str + '='.repeat((4 - str.length % 4) % 4);
        return atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
      };
      
      let decodedHeader: any = {};
      let decodedPayload: any = {};
      
      try {
        decodedHeader = JSON.parse(decodeBase64(headerB64));
        decodedPayload = JSON.parse(decodeBase64(payloadB64));
      } catch (error) {
        console.error(`Failed to decode JWT ${name}:`, error);
      }

      return {
        name,
        tokenLength: token.length,
        header: decodedHeader,
        payload: decodedPayload,
        headerRaw: headerB64,
        payloadRaw: payloadB64,
        signatureLength: signature.length
      };
    };

    const jwt1Analysis = analyzeJWT(token1, 'Exact KlingAI Format');
    const jwt2Analysis = analyzeJWT(token2, 'Alternative Format');

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Testing KlingAI reference implementation format',
      credentials: {
        accessKeyLength: KLING_ACCESS_KEY?.length,
        secretKeyLength: KLING_SECRET_KEY?.length,
      },
      jwtAnalysis: {
        exact: jwt1Analysis,
        alternative: jwt2Analysis,
        tokensIdentical: token1 === token2
      },
      apiTests: testResults,
      summary: {
        allTestsFailed: testResults.every(test => !test.success),
        anyTestPassed: testResults.some(test => test.success),
        differentResults: testResults.some(test => test.success) && testResults.some(test => !test.success)
      },
      nextSteps: [
        testResults.every(test => !test.success) ? 
          '❌ All JWT formats failed - credential issue confirmed' : 
          '✅ Some formats work - need to identify correct format',
        '🔍 Check KlingAI dashboard for account status',
        '🔑 Try regenerating API credentials',
        '📧 Contact KlingAI support with error code 1002'
      ]
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('🚨 KlingAI reference test failed:', error);
    return new Response(JSON.stringify({
      error: 'KlingAI reference test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 