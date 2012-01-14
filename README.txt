#NBA Stats Geek Hover

This is the code for the chrome extension NBA Stats Geek Hover (maybe NSGH would have been better?) -- 
https://chrome.google.com/webstore/detail/ghgccfgiknighncnbmjmhbdikepdpooo

The code detect links on ESPN NBA pages for players and teams then provides a bubble hover to display stats. since there 
is no API to get NBA player info this relies on screen scraping several pages to put together the data (e.g if the page
is a recap it grabs player info as well as box score info from the game referenced).  

Due to the screen scraping nature the code can break.  

nbastat.js handles detect links for players (e.g. nba/player/_/id/) and fetching the data. Frankly it's out of control.
Like most code it started as a learning process for writing a chrome extension and I haven't had the motivation to
fix it.  It's ugly (really ugly) but it works.

The model classes are better organized. They have an easier job :)

The parsing classes do the job of scraping away the HTML and populating the models.  The method I choose to use was to
strip away the HTML and then jump into the text looking for key markers (e.g. Age: to parse the players age).  It's not
great, but works pretty well.  

I've found the extension pretty useful.  ESPN has since added onclick hovers but I don't find the data that's populated
particularly useful.

This extension is in now way affiliated with ESPN, the NBA or stat geeks (or hover craft for that matter).  