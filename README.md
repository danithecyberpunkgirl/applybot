# applybot (depricated)
(Update 2024) Originally this utilized a 3rd party captcha service that used cheap labor from the global south. I've learned a lot 
since this project and I'm never going to do anything like that again. I encourage others to 
seek out more ethical solutions than I did in my past.

___

Hey! I found [this guy's bot to apply to kelloggs](https://github.com/SeanDaBlack/KelloggBot).
I'm not very good with python, so I decided to port over to javascript. ~~My captcha solving
solution has diverged a bit, but that's probably fine.~~ Excited to get people familiar with the 
javascript stack involved!

We've got a lot of [temp agencies to target](https://www.reddit.com/r/antiwork/comments/rdiffe/kellogs_is_now_attempting_to_use_outside_agencies/)
so its time to get working.

# Installation and running
~~You'll need your matching chromedriver. I included one for windows chrome version 96.0. Instructions
can be found in the original bot repo.~~

~~Get node and yarn if you don't have them already, then run `yarn install` from the project root. If
everything works, that should download the required packages for you.~~

~~Next you'll need to head on over to this [captcha cracking service] and
throw them some cryptocurrency for an API key. It is incredibly cheap and I didn't have the time to
do a full implementation of anything else.~~

~~Once you have an API key, extract captchaplugin-noapikey.zip into its own folder and edit 
`./js/config_ac_api_key.js`. You'll see a place to put the key inside. Zip everything back up
(the loose files, no parent folder or you'll have issues. The root of the zip should be the 
loose files) into a file called `captchaplugin.zip`. Since this now has your personal API key,
that file is in the gitignore.~~

~~You should be able to just run `yarn start` from the root. I have a full time job IRL so I don't have
much time to help debug issues but if you post a bug I'll try to get to it.~~
