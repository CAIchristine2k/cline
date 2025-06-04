II. Image generation
2-0 Capability Mapkling-v1
1:1 16:9 4:3 3:2 2:3 3:4 9:16
text to image - ✅ ✅ ✅ ✅ ✅ ✅ ✅
image to image entire image ✅ ✅ ✅ ✅ ✅ ✅ ✅

    others	-	-	-	-	-	-	-kling-v1-5
    1:1	16:9	4:3	3:2	2:3	3:4	9:16	21:9

text to image - ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅
image to image entire image - - - - - - - -

    subject	✅	✅	✅	✅	✅	✅	✅	✅

    face	✅	✅	✅	✅	✅	✅	✅	✅kling-v2
    1:1	16:9	4:3	3:2	2:3	3:4	9:16	21:9

text to image - ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅
image to image restyle ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅

    others	-	-	-	-	-	-	-	-Iamge Editing	support or not

image expansion ✅
others -Model kling-v1
kling-v1-5
kling-2

Feature Text2Image Image2Image Text2Image Image2Image Text2Image Image2Image
Resolution 1K 1K 1K 1K 1K/2K 1K

2-1【Image Generation】Create taskProtocol https
Request URL /v1/images/generations
Request Method POST
Request Format application/json
Response Format application/jsonRequest HeaderField Value Description
Content-Type application/json Data Exchange Format
Authorization Authentication information, refer to API authentication Authentication information, refer to API authenticationRequest Body
Please note that in order to maintain naming consistency, the original model field has been changed to model_name, so in the future, please use this field to specify the version of the model that needs to be called.
● At the same time, we keep the behavior forward-compatible, if you continue to use the original model field, it will not have any impact on the interface call, there will not be any exception, which is equivalent to the default behavior when model_name is empty (i.e., call the V1 model).Field Type Required Field Default Description
model_name string Optional kling-v1 Model Name
● Enum values：kling-v1, kling-v1-5, kling-v2
prompt string Required None Positive text prompt
● Cannot exceed 2500 characters
negative_prompt string Optional Null Negative text prompt
● Cannot exceed 2500 characters
Note: In the Image-to-Image scenario (when the "image" field is not empty), negative prompts are not supported.
image string Optional Null Reference Image
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
image_reference string Optional Null Image reference type
● Enum values：subject(character feature reference), face(character appearance reference)
● When using face(character appearance reference), the uploaded image must contain only one face.
● When using kling-v1-5 and the image parameter is not empty, the current parameter is required
image_fidelity float Optional 0.5 Face reference intensity for user-uploaded images during generation
● Value range：[0,1]，The larger the value, the stronger the reference intensity
Only kling-v1, kling-v1-5 supports the current parameter
human_fidelity float Optional 0.45 Facial reference intensity, refers to the similarity of the facial features of the person in the reference image
● Value range：[0,1]，The larger the value, the stronger the reference intensity
● Only image_reference parameter is subject is available
Only kling-v1-5 supports the current parameter
resolution string 可选 1k Image generation resolution
● Enum values：1k, 2k
○ 1k：1K standard
○ 2k：2K high-res
The support range for different model versions. For more details, please refer to the current document's "2-0 Capability Map"
n int Optional 1 Number of generated images
● Value range：[1,9]
aspect_ratio string Optional 16:9 Aspect ratio of the generated images (width:height)
● Enum values：16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3, 21:9
The support range for different model versions. For more details, please refer to the current document's "2-0 Capability Map"
callback_url string Optional None The callback notification address for the result of this task. If configured, the server will actively notify when the task status changes
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

2-2【Image Generation】Query Task（Single）Protocol https
Request URL /v1/images/generations/{id}
Request Method GET
Request Format application/json
Response Format application/jsonRequest HeaderField Value Description
Content-Type application/json Data Exchange Format
Authorization Authentication information, refer to API authentication Authentication information, refer to API authenticationRequest Path ParametersField Type Required Field DefaultValue Description
task_id string Required None The task ID generated by images
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

2-3【Image Generation】Query Task (List)Protocol https
Request URL /v1/images/generations
Request Method GET
Request Format application/json
Response Format application/jsonRequest HeaderField Value Description
Content-Type application/json Data Exchange Format
Authorization Authentication information, refer to API authentication Authentication information, refer to API authenticationQuery Parameters
/v1/images/generations?pageNum=1&pageSize=30Field Type Required Field Default Value Description
pageNum int Optional 1 Page number
● Value range：[1,1000]
pageSize int Optional 30 Data volume per page
● Value range：[1,500]Request Body
None
Response Body
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
]
}

2-4【Image Expansion】Create taskProtocol https
Request URL /v1/images/editing/expand
Request Method POST
Request Format application/json
Response Format application/jsonRequest HeaderField Value Description
Content-Type application/json Data Exchange Format
Authorization Authentication information, refer to API authentication Authentication information, refer to API authenticationRequest BodyField Type Required Field Default Description
image string Required Null Reference Image
● Support inputting image Base64 encoding or image URL (ensure accessibility)
Please note, if you use the Base64 method, make sure all image data parameters you pass are in Base64 encoding format. When submitting data, do not add any prefixes to the Base64-encoded string, such as data:image/png;base64. The correct parameter format should be the Base64-encoded string itself.
Example: Correct Base64 encoded parameter:
iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
Incorrect Base64 encoded parameter (includes the data: prefix):
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
Please provide only the Base64-encoded string portion so that the system can correctly process and parse your data.
● Supported image formats include.jpg / .jpeg / .png
● The image file size cannot exceed 10MB, and the width and height dimensions of the image shall not be less than 300px, and the aspect ratio of the image should be between 1:2.5 ~ 2.5:1
up_expansion_ratio float Required 0 Expand upwards range; calculated based on multiples of the original image height.
● Value range: [0, 2]. The total area of the new image must not exceed 3 times that of the original image.
● Example: If the original image height is 20 and the current parameter value is 0.1, then:
○ The distance from the top edge of the original image to the top edge of the new image is 20 × 0.1 = 2, and the expanded area within this region is entirely part of the upscaled image.
bottom_expansion_ratio float Required 0 Expand downwards range; calculated based on multiples of the original image height.
● Value range: [0, 2]. The total area of the new image must not exceed 3 times that of the original image.
● Example: If the original image height is 20 and the current parameter value is 0.2, then:
○ The distance from the bottom edge of the original image to the bottom edge of the new image is 20 × 0.2 = 4, and the expanded area within this region is entirely part of the downscaled image.
left_expansion_ratio float Required 0 Expand leftwards range; calculated based on multiples of the original image width.
● Value range: [0, 2]. The total area of the new image must not exceed 3 times that of the original image.
● Example: If the original image width is 30 and the current parameter value is 0.3, then:
○ The distance from the left edge of the original image to the left edge of the new image is 30 × 0.3 = 9, and the expanded area within this region is entirely part of the left-scaled image.
right_expansion_ratio float Required 0 Expand rightwards range; calculated based on multiples of the original image width.
● Value range: [0, 2]. The total area of the new image must not exceed 3 times that of the original image.
● Example: If the original image width is 30 and the current parameter value is 0.4, then:
○ The distance from the right edge of the original image to the right edge of the new image is 30 × 0.4 = 12, and the expanded area within this region is entirely part of the right-scaled image.
prompt string Optional None Positive text prompt
● Cannot exceed 2500 characters
n int Optional 1 Number of generated images
● Value range：[1,9]
callback_url string Optional None The callback notification address for the result of this task. If configured, the server will actively notify when the task status changes
● The specific message schema of the notification can be found in "Callback Protocol"
external_task_id string Optional None Customized Task ID
● Users can provide a customized task ID, which will not overwrite the system-generated task ID but can be used for task queries.
● Please note that the customized task ID must be unique within a single user account.Response Body
{
"code": 0, //Error Codes；Specific definitions can be found in Error codes
"message": "string", //Error information
"request_id": "string", //Request ID, generated by the system, is used to track requests and troubleshoot problems
"data":{
"task_id": "string", //Task ID, generated by the system
"task_info":{ //Task creation parameters
"external_task_id": "string" //Customer-defined task ID
},
"task_status": "string", //Task status, Enum values：submitted、processing、succeed、failed
"created_at": 1722769557708, //Task creation time, Unix timestamp, unit ms
"updated_at": 1722769557708 //Task update time, Unix timestamp, unit ms
}
}
Example code
import math

def calculate_expansion_ratios(width, height, area_multiplier, aspect_ratio):
"""
Calculate top/bottom/left/right expansion ratios for image outpainting.

    Parameters:
    - width: Original image width
    - height: Original image height
    - area_multiplier: Multiplier for the outpainted area relative to original image
    - aspect_ratio: Width/height ratio for the outpainted area（width/height）

    Returns:
    - Formatted string with 4 decimal places, e.g."0.1495,0.1495,0.6547,0.6547"
    """
    # Calculate target total area
    target_area = area_multiplier * width * height

    # Calculate target height and width (maintaining aspect ratio)
    target_height = math.sqrt(target_area / aspect_ratio)
    target_width = target_height * aspect_ratio

    # Calculate expansion pixels
    expand_top = (target_height - height) / 2
    expand_bottom = expand_top
    expand_left = (target_width - width) / 2
    expand_right = expand_left

    # Calculate relative ratios
    top_ratio = expand_top / height
    bottom_ratio = expand_bottom / height
    left_ratio = expand_left / width
    right_ratio = expand_right / width

    # Format to 4 decimal places
    return f"{top_ratio:.4f},{bottom_ratio:.4f},{left_ratio:.4f},{right_ratio:.4f}"

# Example: Original 100x100, 3x area multiplier, 16:9 aspect ratio

print(calculate_expansion_ratios(100, 100, 3, 16/9))

# Output: "0.1495,0.1495,0.6547,0.6547"

2-5【Image Expansion】Query Task（Single）Protocol https
Request URL /v1/images/editing/expand/{id}
Request Method GET
Request Format application/json
Response Format application/jsonRequest HeaderField Value Description
Content-Type application/json Data Exchange Format
Authorization Authentication information, refer to API authentication Authentication information, refer to API authenticationRequest Path ParametersField Type Required Field DefaultValue Description
task_id string Required None The task ID generated by images
● Request Path Parameters，directly fill the Value in the request pathRequest Body
无
Response Body
{
"code": 0, //Error codes；Specific definitions can be found in Error codes
"message": "string", //Error information
"request_id": "string", //Request ID, generated by the system, is used to track requests and troubleshoot problems
"data":{
"task_id": "string", //Task ID, generated by the system
"task_status": "string", //Task status, Enum values：submitted、processing、succeed、failed
"task_status_msg": "string", //Task status information, displaying the failure reason when the task fails (such as triggering the content risk control of the platform, etc.)
"task_info":{ //Task creation parameters
"external_task_id": "string" //Customer-defined task ID
},
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

2-6【Image Expansion】Query Task (List)Protocol https
Request URL /v1/images/editing/expand
Request Method GET
Request Format application/json
Response Format application/jsonRequest HeaderField Value Description
Content-Type application/json Data Exchange Format
Authorization Authentication information, refer to API authentication Authentication information, refer to API authenticationRequest Path ParametersField Type Required Field Default Value Description
pageNum int Optional 1 Page number
● Value range：[1,1000]
pageSize int Optional 30 Data volume per page
● Value range：[1,500]Request Body
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
"task_info":{ //Task creation parameters
"external_task_id": "string" //Customer-defined task ID
},
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

III. Video Generation
