from rest_framework.authtoken.models import Token

def test_token_model():
    try:
        token = Token.objects.create(key='testkey')
        return f"Token created: {token.key}"
    except Exception as e:
        return f"Error: {str(e)}"

print(test_token_model())
