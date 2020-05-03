# Examples
Those are some samples of circunstances in which you may use any of those commands.

## removeElements

## removeElementById
Let's say the page you visit has a header with a giant ad, which your AdBlocker didn't recognized properly. Although, that header has an ID. If that ID was `my_header`, yoy could use that command like that:
```
tmu.removeElementById("my_header");
```

## removeElementsByTagName
Let's say the page you visit shows its ads inside iframes. You could just hide them, but iframes usually consume much more resources, since they are whole new pages being opened. If the website does no other use for iframes, you can use that command like that:
```
tmu.removeElementsByTagName("iframe");
```

## removeElementsByClassName

## addStyle

## css

## hide

## loop
Let's say the page you visit shows a floating ad, but it's not there in the moment you launch the page; it appears later. If that ad is always contained inside an iframe, and the website does no other use for iframes, you can use that command like that:
```
tmu.loop(2, function() {
    tmu.removeElementsByTagName("iframe");
});
```
