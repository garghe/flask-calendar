import whisper
from pytube import YouTube

#Test downloading a youtube audio track
# youtube_video_url = "https://www.youtube.com/watch?v=ry9SYnV3svc"
# youtube_video_content = YouTube(youtube_video_url)
#
# audio_streams = youtube_video_content.streams.filter(only_audio=True)
# audio_stream = audio_streams[1]
# audio_stream.download("")
#
# model = whisper.load_model("base")
# result = model.transcribe(str(audio_stream.default_filename), verbose=True)
# print(result)

#Test with my voice
model = whisper.load_model("base")
result = model.transcribe("New Recording 9.m4a", verbose=True)
print(result)