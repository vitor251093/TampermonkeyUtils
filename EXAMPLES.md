# Examples
Those are some samples of circunstances in which you may use any of those commands.

## remove(array)
Let's say the page you visit has some ads your ad blocker couldn't detect, and you had to do some more advanced stuff to get their DOM elements. You could use that command like that, so you delete all of them at once:
```
tmu.remove(list);
```

## remove({id})
Let's say the page you visit has a header with a giant ad, which your AdBlocker didn't recognized properly. Although, that header has an ID. If that ID was `my_header`, you could use that command like that:
```
tmu.remove({id:"my_header"});
```

## remove({tag})
Let's say the page you visit shows its ads inside iframes. You could just hide them, but iframes usually consume much more resources, since they are whole new pages being opened. If the website does no other use for iframes, you can use that command like that:
```
tmu.remove({tag:"iframe"});
```

## remove({className})
Let's say the page you visit shows its ads like posts. If the website gives those posts their own unique tags, those may be turned into classes depending of the page framework. If those posts have the tag `ad-tag`, you can use that command like that:
```
tmu.remove({className:"ad-tag"});
```

## addStyle & css
Those two serve the same purpose: adding a new style to the page, and/or editing the style of an element. `addStyle` adds a new style to the page, while `css` can do both, depending of its parameters. Basically, CSS just creates a more readable, and easier to work with, approach to `addStyle`. The two commands below do exactly the same:
```
tmu.addStyle(".jb-dt-main-image img { height: 466px; }");
tmu.css(".jb-dt-main-image img", "height", "466px");
```

## hide + exception
Let's say the page you visit adds a bunch of adds, which can be rooted to individual DIVs in the body, but there are also the DIVs with actual content. If those DIVs with content happen to have classes that the others don't have, like `topo` and `meio`, you can use that command like that:
```
tmu.hide("body > div").exceptions([".topo", ".meio"]);
```

That doesn't work only for classes. You can also use IDs, or the elements themselves. And it doesn't need to be an array either. _However_, if you give a DOM array to `hide` and string identifiers to `exceptions`, those exceptions won't work. That's the case that should be avoided.

If there are no exceptions, you just need to omit that part:
```
tmu.hide("body > div");
```

## loop
Let's say the page you visit shows a floating ad, but it's not there in the moment you launch the page; it appears later. If that ad is always contained inside an iframe, and the website does no other use for iframes, you can use that command like that:
```
tmu.loop(2, function() {
    tmu.remove({tag:"iframe"});
});
```
The following also works:
```
tmu.remove({tag:"iframe"}, {loop:2});
```
