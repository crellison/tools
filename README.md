# Helpful Snippets

I am compiling a file of functions, regular expressions, and other snippets I commonly use when developing. This may become an NPM package someday provided it becomes large enough.

I have also chosen to include some resources to help with syntax for a variety of other languages.

If any tools are not mine or of my own creation, I will give proper attribution. Should you find anything out of place, please open a PR or otherwise notify me.

## The Resources

[javascript snippets](./helpfulTools.js)  

## Some Bash Scripts

Convert `.p12` file to `.pem` (necessary for configuring push notifications for iOS)  
Solution found [here](http://stackoverflow.com/questions/21250510/generate-pem-file-used-to-setup-apple-push-notification) credit to [Ravi Parmar](http://stackoverflow.com/users/1496927/rv15)
```bash
openssl pkcs12 -in pushcert.p12 -out pushcert.pem -nodes -clcerts
```
  
## Helpful Bits From Other Folk

[bash cheatsheet](./bash-cheatsheet.md) credit to [J. Le Coupanec](https://github.com/LeCoupa)  
[latex in minutes](./latex.md) credit to [Luong Vo](https://github.com/VoLuong)  
[salt rounds](./salt-rounds.md) credit to [Thomas Porin](http://security.stackexchange.com/users/655/thomas-pornin)