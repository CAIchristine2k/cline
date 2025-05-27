General Information
API Domain
1
https://api.klingai.com
API Authentication
Step-1：Obtain AccessKey + SecretKey
Step-2：Every time you request the API, you need to generate an API Token according to the Fixed Encryption Method, Authorization = Bearer <API Token> in Requset Header
Encryption Method：Follow JWT（Json Web Token, RFC 7519）standard
JWT consists of three parts：Header、Payload、Signature
python
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
Step-3: Use the API Token generated in Step 2 to assemble the Authorization and include it in the Request Header.
Assembly format: Authorization = “Bearer XXX”, where XXX is the API Token generated in Step 2.
Note: There should be a space between Bearer and XXX.
Error Code
HTTP Status Code	Service Code	Definition of Service Code	Explaination of Service Code	Suggested Solutions
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
429	1302	Trigger strategy	The API request is too fast, exceeding the platform’s rate limit	Reduce the request frequency, try again later, or contact customer service to increase the limit
429	1303	Trigger strategy	Concurrency or QPS exceeds the prepaid resource package limit	Reduce the request frequency, try again later, or contact customer service to increase the limit
429	1304	Trigger strategy	Trigger the platform’s IP whitelisting policy	Contact customer service
500	5000	Internal error	Server internal error	Try again later, or contact customer service
503	5001	Internal error	Server temporarily unavailable, usually due to maintenance	Try again later, or contact customer service
504	5002	Internal error	Server internal timeout, usually due to a backlog	Try again later, or contact customer service
Previous chapter：Update Announcement


Virtual Try-On
Create Task
Protocol	Request URL	Request Method	Request Format	Response Format
https	/v1/images/kolors-virtual-try-on	POST	application/json	application/json
Request Header
Field	Value	Description
Content-Type	application/json	Data Exchange Format
Authorization	Authentication information, refer to API authentication	Authentication information, refer to API authentication
Request Body
Field	Type	Required Field	Default	Description
model_name	string	Optional	kolors-virtual-try-on-v1	
Model Name

Enum values：kolors-virtual-try-on-v1, kolors-virtual-try-on-v1-5
human_image	string	Required	Null	
Reference human Image

Support uploading image Base64 encoding or image URL (ensure accessibility)
Please note, if you use the Base64 method, make sure all image data parameters you pass are in Base64 encoding format. When submitting data, do not add any prefixes to the Base64-encoded string, such as data:image/png;base64. The correct parameter format should be the Base64-encoded string itself.
Example: Correct Base64 encoded parameter:
1
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
Incorrect Base64 encoded parameter (includes the data: prefix):
1
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
Please provide only the Base64-encoded string portion so that the system can correctly process and parse your data.
Supported image formats include.jpg / .jpeg / .png
The image file size cannot exceed 10MB, and the width and height dimensions of the image shall not be less than 300px
cloth_image	string	Optional	Null	
Reference clothing image

Support uploading clothing product images or clothing image with white background; Supports single clothing (upper, lower, and dress) try-on.
Support uploading image Base64 encoding or image URL (ensure accessibility)
Please note, if you use the Base64 method, make sure all image data parameters you pass are in Base64 encoding format. When submitting data, do not add any prefixes to the Base64-encoded string, such as data:image/png;base64. The correct parameter format should be the Base64-encoded string itself.
Example: Correct Base64 encoded parameter:
1
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
Incorrect Base64 encoded parameter (includes the data: prefix):
1
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
Please provide only the Base64-encoded string portion so that the system can correctly process and parse your data.
Supported image formats include.jpg / .jpeg / .png

The image file size cannot exceed 10MB, and the width and height dimensions of the image shall not be less than 300px

Kolors-virtual-try-on-v1-5 model not only supports single clothing input but also the “upper + lower” combination input, which means:

Input a single clothing image (upper, lower, or dress) -> Generate a try-on image of the single item
Input a combination clothing image (you can merge multiple items into one image with a white background)
If the model detects “upper + lower” -> Generate a try-on image of “upper + lower”
If the model detects “upper + upper” -> Generation fails
If the model detects “lower + lower” -> Generation fails
If the model detects “dress + dress” -> Generation fails
If the model detects “upper + dress” -> Generation fails
If the model detects “lower + dress” -> Generation fails

callback_url	string	Optional	None	
The callback notification address for the result of this task. If configured, the server will actively notify when the task status changes

The specific message schema of the notification can be found in “Callback Protocol”
Response Body
JSON
{
  "code": 0, //Error codes;Specific definitions can be found in Error codes
  "message": "string", //Error information
  "request_id": "string", //Task ID, generated by the system, used for tracking requests and debug issues
  "data":{
  	"task_id": "string", //Task ID, generated by the system
    "task_status": "string", //Task status, Enum values：submitted、processing、succeed、failed
    "created_at": 1722769557708, //Task creation time, Unix timestamp, unit ms
    "updated_at": 1722769557708 //Task update time, Unix timestamp, unit ms
  }
}
Query Task (Single)
Protocol	Request URL	Request Method	Request Format	Response Format
https	/v1/images/kolors-virtual-try-on/{id}	GET	application/json	application/json
Request Header
Field	Value	Description
Content-Type	application/json	Data Exchange Format
Authorization	Authentication information, refer to API authentication	Authentication information, refer to API authentication
Request Path Parameters
Field	Type	Required Field	Default	Description
task_id	string	Required	None	Task ID for image generation
Request Path Parameters，directly fill the Value in the request path
Request Body
None

Response Body
JSON
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
          "index": int, //Image Number
          "url": "string" //URL for generating images, such as：https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png(To ensure information security, generated images/videos will be cleared after 30 days. Please make sure to save them promptly.)
        }
      ]
    }
  }
}
Query Task (List)
Protocol	Request URL	Request Method	Request Format	Response Format
https	/v1/images/kolors-virtual-try-on	GET	application/json	application/json
Request Header
Field	Value	Description
Content-Type	application/json	Data Exchange Format
Authorization	Authentication information, refer to API authentication	Authentication information, refer to API authentication
Query Parameters
/v1/images/kolors-virtual-try-on?pageNum=1&pageSize=30

Field	Type	Required Field	Default	Description
pageNum	int	Optional	1	Page number
Value range：[1,1000]
pageSize	int	Optional	30	Data volume per page
Value range：[1,500]
Request Body
None

Response Body
JSON

{
  "code": 0, //Error codes；Specific definitions can be found in Error codes
  "message": "string", //Error information
  "request_id": "string", //Request ID, generated by the system, is used to track requests and troubleshoot problems
  "data":[
    {
      "task_id": "string", //Task ID, generated by the system
      "task_status": "string", //Task status, Enum values：submitted、processing、succeed、failed
      "task_status_msg": "string", //Task status information, displaying the failure reason when the task fails (such as triggering the content risk control of the platform, etc.)
      "created_at": 1722769557708, //Task creation time, Unix timestamp, unit ms
      "updated_at": 1722769557708, //Task creation time, Unix timestamp, unit ms
      "task_result":{
        "images":[
          {
            "index": int, //Image Number
            "url": "string" //URL for generating images，such as: https://h1.inkwai.com/bs2/upload-ylab-stunt/1fa0ac67d8ce6cd55b50d68b967b3a59.png(To ensure information security, generated images/videos will be cleared after 30 days. Please make sure to save them promptly.)
          }
      	]
      }
    }
  ]
}