FILES:=images/* templates/* playerbar.js tracklist.js manifest.json

.PHONY: xpi
xpi: mixcloud-tracklist.xpi

.PHONY: zip
zip: mixcloud-tracklist.zip

mixcloud-tracklist.xpi:
	zip mixcloud-tracklist.xpi $(FILES)

mixcloud-tracklist.zip:
	zip mixcloud-tracklist.zip $(FILES)
