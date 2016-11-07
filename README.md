# Mixcloud Tracklist browser extension

This is an *unofficial* Mixcloud browser extension. It displays the tracklist
the same way it did before they changed their [licensing][mc-support].
It supports both the old (~2013-2016) Mixcloud website and the new Mixcloud
website (still in beta as of November 2016).

The extension has been built with [Mozilla's WebExtensions API][moz-webext] so
it should be compatible with Mozilla Firefox, Google Chrome, and any other
browser that supports the WebExtension APIs.

---

 - [Google Chrome Extension][chrome-install]
 - [Mozilla Firefox Add-on][firefox-install]
 - [Tampermonkey Userscript][tampermonkey-install] for users on other browsers (requires [Tampermonkey][tampermonkey])

---

![Screenshot](screenshot.png)

## Didn't this used to exist?
Yep, it used to be built into the Mixcloud website, but their licensing changed meaning they couldn't show the tracklist.

> As a non-interactive streaming service, our licenses don't allow for
> tracklists to be made visible in advance. However as you listen through a
> show or DJ mix set, the track names will be revealed.
>
> Last Updated: Jul 28, 2015 05:20PM IST

## Thanks
 - [Perry Harlock](https://github.com/perryharlock) for helping me with the the HTML template and for debugging some of the compatibility issues with the new Mixcloud website :heart:

## License
The content of this library is released under the **MIT License** by
**Andrew Lawson**.<br/> You can find a copy of this license in
[`LICENSE`](LICENSE) or at http://opensource.org/licenses/mit.

[chrome-install]: https://chrome.google.com/webstore/detail/mixcloud-tracklist/lkoingeajallinlnijfpmmddoeoficef
[firefox-install]: https://addons.mozilla.org/firefox/addon/mixcloud-tracklist
[tampermonkey-install]: https://gist.github.com/adlawson/147e22f20e6f1eeb75c8e37acc19c96c
[mc-support]: http://support.mixcloud.com/customer/portal/articles/1595557
[moz-webext]: https://wiki.mozilla.org/WebExtensions
[tampermonkey]: https://tampermonkey.net/
