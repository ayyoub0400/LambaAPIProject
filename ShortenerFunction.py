import json  
import boto3 
import string 
import random 

#Initialise DynamoDB connection
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('URLShortner') #Connect to our DynamoDB Table

def generate_short_code():
    chars = string.ascii_letters + string.digits #Using ascii letters and digits
    return ''.join(random.choice(chars) for _ in range(6))


def lambda_handler(event, context):
    http_method = event['requestContext']['http']['method'] #Extract http method from event dictionary
    if http_method == 'POST': #If user submits info
        body = json.loads(event['body']) #Load request payload
        long_url = body['long_url'] #Extract long url
    

        short_code = generate_short_code() #Generate short code

        #store mapping in db
        table.put_item(Item={
            'short_code': short_code, #primary key
            'long_url': long_url #associated url
        })
        short_code = f"https://6opd4s0yvk.execute-api.us-east-1.amazonaws.com/prod/{short_code}"
        return {
            'statusCode': 200,
            'body': json.dumps({'Your shortened URL short_code': short_code})
        }
    elif http_method == 'GET': #user requesting link
        
        short_code = event['pathParameters']['short_code'] #Extract short code from query string

        response = table.get_item(Key={'short_code': short_code}) #retrieve long url from shorturl

        if 'Item' not in response:
            return {
                'statusCode': 404, #client error
                'body': json.dumps({'error': 'Short URL not found'})
            }
        
        long_url = response['Item']['long_url'] #extract long url]

        return {
            "statusCode": 302,
            "headers": {"Location": long_url} #redirect user to corresponding link in db
        }

    else:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid HTTP Method'})
        }
