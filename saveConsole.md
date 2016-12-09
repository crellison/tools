The following function implements a `console.save` function which takes data from the developer console and automatically downloads it.

> quoted from [Stack Overflow](http://stackoverflow.com/questions/11849562/how-to-save-the-output-of-a-console-logobject-to-a-file) and [Patrick](http://stackoverflow.com/users/960588/patrick)

```javascript
(function(console){

  console.save = function(data, filename){
    if(!data) {
      console.error('Console.save: No data')
      return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
      data = JSON.stringify(data, undefined, 2)
    }

    var blob = new Blob([data], {type: 'text/json'}),
    e    = document.createEvent('MouseEvents'),
    a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console)
```