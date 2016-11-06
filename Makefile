#
# Source
# ------
BUILD := manifest.json images/* build/mixcloud-tracklist.js
SOURCE := manifest.json images/* templates/*.dust tracklist.js


# Executable path
# ---------------
PATH_BIN = ./node_modules/.bin


# Make all
# --------
all: js xpi zip

.PHONY: clean
clean:
	@rm -rf build templates/*.js


# Build aliases
# -------------
.PHONY: js
js: build/mixcloud-tracklist.js

.PHONY: xpi
xpi: build/mixcloud-tracklist.xpi

.PHONY: zip
zip: build/mixcloud-tracklist.zip


# Build targets
# -------------
build:
	@mkdir -p build

build/mixcloud-tracklist.js: build $(SOURCE)
	@$(PATH_BIN)/dustc templates/**/*.dust -s --cjs
	@$(PATH_BIN)/browserify tracklist.js -t babelify -o build/mixcloud-tracklist.js -d

build/mixcloud-tracklist.xpi: build js $(SOURCE)
	@zip build/mixcloud-tracklist.xpi $(BUILD)

build/mixcloud-tracklist.zip: build js $(SOURCE)
	@zip build/mixcloud-tracklist.zip $(BUILD)
