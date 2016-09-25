FILES:=images/* templates/* playerbar.js tracklist.js manifest.json

.PHONY: xpi
xpi: mixcloud-tracklist.xpi

.PHONY: zip
zip: mixcloud-tracklist.zip

mixcloud-tracklist.xpi: $(FILES)
	zip mixcloud-tracklist.xpi $(FILES)

mixcloud-tracklist.zip: $(FILES)
	zip mixcloud-tracklist.zip $(FILES)
