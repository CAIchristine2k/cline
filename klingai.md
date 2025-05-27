1. API Domain
https://api-singapore.klingai.com
⚠️Notice: The API endpoint for the new system has been updated from  https://api.klingai.com to https://api-singapore.klingai.com.

2. API Authentication
● Step-1：Obtain AccessKey + SecretKey
● Step-2：Every time you request the API, you need to generate an API Token according to the Fixed Encryption Method, Authorization = Bearer <API Token> in Requset Header
● Encryption Method：Follow JWT（Json Web Token, RFC 7519）standard
● JWT consists of three parts：Header、Payload、Signature
● Sample code (Python)：
import time
import jwt

ak = "" # fill access key
sk = "" # fill secret key

def encode_jwt_token(ak, sk):
    headers = {
        "alg": "HS256",
        "typ": "JWT"
    }
    payload = {
        "iss": ak,
        "exp": int(time.time()) + 1800, # The valid time, in this example, represents the current time+1800s(30min)
        "nbf": int(time.time()) - 5 # The time when it starts to take effect, in this example, represents the current time minus 5s
    }
    token = jwt.encode(payload, sk, headers=headers)
    return token

authorization = encode_jwt_token(ak, sk)
print(authorization) # Printing the generated API_TOKEN
● Sample code (Java): 
package test;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTDemo {
    
    static String ak = ""; // fill access key
    static String sk = ""; // fill secret key
    
    public static void main(String[] args) {
        String token = sign(ak, sk);
        System.out.println(token); // Printing the generated API_TOKEN
    }
    static String sign(String ak,String sk) {
        try {
            Date expiredAt = new Date(System.currentTimeMillis() + 1800*1000); // The valid time, in this example, represents the current time+1800s(30min)
            Date notBefore = new Date(System.currentTimeMillis() - 5*1000); // The time when it starts to take effect, in this example, represents the current time minus 5s
            Algorithm algo = Algorithm.HMAC256(sk);
            Map<String, Object> header = new HashMap<String, Object>();
            header.put("alg", "HS256");
            return JWT.create()
                    .withIssuer(ak)
                    .withHeader(header)
                    .withExpiresAt(expiredAt)
                    .withNotBefore(notBefore)
                    .sign(algo);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
● Step-3: Use the API Token generated in Step 2 to assemble the Authorization and include it in the Request Header.
● Assembly format: Authorization = "Bearer XXX", where XXX is the API Token generated in Step 2.
● Note: There should be a space between Bearer and XXX.

3. Error CodeHTTP Status Code	Service Code	Definition of Service Code	Explaination of Service Code	Suggested Solutions
200	0	Request	-	-
401	1000	Authentication failed	Authentication failed	Check if the Authorization is correct
401	1001	Authentication failed	Authorization is empty	Fill in the correct Authorization in the Request Header
401	1002	Authentication failed	Authorization is invalid	Fill in the correct Authorization in the Request Header
401	1003	Authentication failed	Authorization is not yet valid	Check the start effective time of the token, wait for it to take effect or reissue
401	1004	Authentication failed	Authorization has expired	Check the validity period of the token and reissue it
429	1100	Account exception	Account exception	Verifying account configuration information
429	1101	Account exception	Account in arrears (postpaid scenario)	Recharge the account to ensure sufficient balance
429	1102	Account exception	Resource pack depleted or expired (prepaid scenario)	Purchase additional resource packages, or activate the post-payment service (if available)
403	1103	Account exception	Unauthorized access to requested resource, such as API/model	Verifying account permissions
400	1200	Invalid request parameters	Invalid request parameters	Check whether the request parameters are correct
400	1201	Invalid request parameters	Invalid parameters, such as incorrect key or illegal value	Refer to the specific information in the message field of the returned body and modify the request parameters
404	1202	Invalid request parameters	The requested method is invalid	Review the API documentation and use the correct request method
404	1203	Invalid request parameters	The requested resource does not exist, such as the model	Refer to the specific information in the message field of the returned body and modify the request parameters
400	1300	Trigger strategy	Trigger strategy of the platform	Check if any platform policies have been triggered
400	1301	Trigger strategy	Trigger the content security policy of the platform	Check the input content, modify it, and resend the request
429	1302	Trigger strategy	The API request is too fast, exceeding the platform's rate limit	Reduce the request frequency, try again later, or contact customer service to increase the limit
429	1303	Trigger strategy	Concurrency or QPS exceeds the prepaid resource package limit	Reduce the request frequency, try again later, or contact customer service to increase the limit
429	1304	Trigger strategy	Trigger the platform's IP whitelisting policy	Contact customer service
500	5000	Internal error	Server internal error	Try again later, or contact customer service
503	5001	Internal error	Server temporarily unavailable, usually due to maintenance	Try again later, or contact customer service
504	5002	Internal error	Server internal timeout, usually due to a backlog	Try again later, or contact customer service

II. Image generation
2-0 Capability Mapkling-v1	
	1:1	16:9	4:3	3:2	2:3	3:4	9:16
text to image	-	✅	✅	✅	✅	✅	✅	✅
image to image	entire image	✅	✅	✅	✅	✅	✅	✅

	others	-	-	-	-	-	-	-kling-v1-5	
	1:1	16:9	4:3	3:2	2:3	3:4	9:16	21:9
text to image	-	✅	✅	✅	✅	✅	✅	✅	✅
image to image	entire image	-	-	-	-	-	-	-	-

	subject	✅	✅	✅	✅	✅	✅	✅	✅

	face	✅	✅	✅	✅	✅	✅	✅	✅kling-v2	
	1:1	16:9	4:3	3:2	2:3	3:4	9:16	21:9
text to image	-	✅	✅	✅	✅	✅	✅	✅	✅
image to image	restyle	✅	✅	✅	✅	✅	✅	✅	✅

	others	-	-	-	-	-	-	-	-Iamge Editing	support or not
image expansion	✅
others	-Model	kling-v1	
	kling-v1-5	
	kling-2	

Feature	Text2Image	Image2Image	Text2Image	Image2Image	Text2Image	Image2Image
Resolution	1K	1K	1K	1K	1K/2K	1K


2-1【Image Generation】Create taskProtocol	https
Request URL	/v1/images/generations
Request Method	POST
Request Format	application/json
Response Format	application/jsonRequest HeaderField	Value	Description
Content-Type	application/json	Data Exchange Format
Authorization	Authentication information, refer to API authentication	Authentication information, refer to API authenticationRequest Body
Please note that in order to maintain naming consistency, the original model field has been changed to model_name, so in the future, please use this field to specify the version of the model that needs to be called.
● At the same time, we keep the behavior forward-compatible, if you continue to use the original model field, it will not have any impact on the interface call, there will not be any exception, which is equivalent to the default behavior when model_name is empty (i.e., call the V1 model).Field	Type	Required Field	Default	Description
model_name	string	Optional	kling-v1	Model Name
● Enum values：kling-v1, kling-v1-5, kling-v2
prompt	string	Required	None	Positive text prompt
● Cannot exceed 2500 characters
negative_prompt	string	Optional	Null	Negative text prompt
● Cannot exceed 2500 characters
Note: In the Image-to-Image scenario (when the "image" field is not empty), negative prompts are not supported.
image	string	Optional	Null	Reference Image
● Support inputting image Base64 encoding or image URL (ensure accessibility)
Please note, if you use the Base64 method, make sure all image data parameters you pass are in Base64 encoding format. When submitting data, do not add any prefixes to the Base64-encoded string, such as data:image/png;base64. The correct parameter format should be the Base64-encoded string itself.
Example: Correct Base64 encoded parameter: 
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
Incorrect Base64 encoded parameter (includes the data: prefix): 
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
Please provide only the Base64-encoded string portion so that the system can correctly process and parse your data.
● Supported image formats include.jpg / .jpeg / .png
● The image file size cannot exceed 10MB, and the width and height dimensions of the image shall not be less than 300px, and the aspect ratio of the image should be between 1:2.5 ~ 2.5:1
● the image_reference parameter is not empty, the current parameter is required
image_reference	string	Optional	Null	Image reference type
● Enum values：subject(character feature reference), face(character appearance reference)
● When using  face(character appearance reference), the uploaded image must contain only one face.
● When using kling-v1-5 and the image parameter is not empty, the current parameter is required
image_fidelity	float	Optional	0.5	Face reference intensity for user-uploaded images during generation
● Value range：[0,1]，The larger the value, the stronger the reference intensity
Only kling-v1, kling-v1-5 supports the current parameter
human_fidelity	float	Optional	0.45	Facial reference intensity, refers to the similarity of the facial features of the person in the reference image
● Value range：[0,1]，The larger the value, the stronger the reference intensity
● Only image_reference parameter is subject is available
Only kling-v1-5 supports the current parameter
resolution	string	可选	1k	Image generation resolution
● Enum values：1k, 2k
	○ 1k：1K standard
	○ 2k：2K high-res
The support range for different model versions. For more details, please refer to the current document's "2-0 Capability Map"
n	int	Optional	1	Number of generated images
● Value range：[1,9]
aspect_ratio	string	Optional	16:9	Aspect ratio of the generated images (width:height)
● Enum values：16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, 21:9
The support range for different model versions. For more details, please refer to the current document's "2-0 Capability Map"
callback_url	string	Optional	None	The callback notification address for the result of this task. If configured, the server will actively notify when the task status changes
● The specific message schema of the notification can be found in "Callback Protocol"Response Body
{
	"code": 0, //Error Codes；Specific definitions can be found in Error codes
  "message": "string", //Error information
  "request_id": "string", //Request ID, generated by the system, is used to track requests and troubleshoot problems
  "data":{
  	"task_id": "string", //Task ID, generated by the system
    "task_status": "string", //Task status, Enum values：submitted、processing、succeed、failed
    "created_at": 1722769557708, //Task creation time, Unix timestamp, unit ms
    "updated_at": 1722769557708 //Task update time, Unix timestamp, unit ms
  }
}

2-2【Image Generation】Query Task（Single）Protocol	https
Request URL	/v1/images/generations/{id}
Request Method	GET
Request Format	application/json
Response Format	application/jsonRequest HeaderField	Value	Description 
Content-Type	application/json	Data Exchange Format
Authorization	Authentication information, refer to API authentication	Authentication information, refer to API authenticationRequest Path ParametersField	Type	Required Field	DefaultValue	Description 
task_id	string	Required	None	The task ID generated by images
● Request Path Parameters，directly fill the Value in the request pathRequest Body
None
Response Body
{
	"code": 0, //Error codes；Specific definitions can be found in Error codes
  "message": "string", //Error information
  "request_id": "string", //Request ID, generated by the system, is used to track requests and troubleshoot problems
  "data":{
  	"task_id": "string", //Task ID, generated by the system
    "task_status": "string", //Task status, Enum values：submitted、processing、succeed、failed
    "task_status_msg": "string", //Task status information, displaying the failure reason when the task fails (such as triggering the content risk control of the platform, etc.)
    "created_at": 1722769557708, //Task creation time, Unix timestamp, unit ms
    "updated_at": 1722769557708, //Task update time, Unix timestamp, unit ms
    "task_result":{
    	"images":[
        {
        	"index": int, //Image Number，0-9
          "url": "string" //URL for generating images，such as：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png(To ensure information security, generated images/videos will be cleared after 30 days. Please make sure to save them promptly.)
        }
      ]
    }
  }
}

2-3【Image Generation】Query Task (List)Protocol	https
Request URL	/v1/images/generations
Request Method	GET
Request Format	application/json
Response Format	application/jsonRequest HeaderField	Value	Description 
Content-Type	application/json	Data Exchange Format
Authorization	Authentication information, refer to API authentication	Authentication information, refer to API authenticationQuery Parameters
/v1/images/generations?pageNum=1&pageSize=30Field	Type	Required Field	Default Value	Description 
pageNum	int	Optional	1	Page number
● Value range：[1,1000]
pageSize	int 	Optional	30	Data volume per page
● Value range：[1,500]Request Body
None
Response Body
