<<<<<<< HEAD
import opentok
from opentok import MediaModes

api_key ="47592851"
api_secret = "da57027b1239cb057077a67880902d54aa6240aa"


opentok_sdk = opentok.OpenTok(api_key, api_secret)
session = opentok_sdk.create_session(media_mode=MediaModes.routed)
token = opentok_sdk.generate_token(session.session_id)

print ("ID = ", session.session_id);
print ("\n");
=======
import opentok
from opentok import MediaModes

api_key ="47592851"
api_secret = "da57027b1239cb057077a67880902d54aa6240aa"


opentok_sdk = opentok.OpenTok(api_key, api_secret)
session = opentok_sdk.create_session(media_mode=MediaModes.routed)
token = opentok_sdk.generate_token(session.session_id)

print ("ID = ", session.session_id);
print ("\n");
>>>>>>> d0e8235f19503e3e4724de99ef77617ea8307391
print ("Token = ", token);