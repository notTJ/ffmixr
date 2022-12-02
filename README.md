the intended use of this tool is to create scriptable/configured FFmpeg commands to perform repeatable edits

the "rescore" script - replaces a movie's music tracks with a song
splitting the audio channel is done with the channelsplit filter
channelmap filter may be a better use

either way this project is sliced, the deno-fast-forward lib needs to be able to handle multiple inputs.

imports are using local references, sorry this is out of laziness while I use local changes alongside the deno-ff package
