# Recommended # of iterations when using PKBDF2-SHA256?

> quoted from [stackexchange](http://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256/3993#3993) and [Thomas Porin](http://security.stackexchange.com/users/655/thomas-pornin)

You should use the maximum number of rounds which is tolerable, performance-wise, in your application. The number of rounds is a slowdown factor, which you use on the basis that under normal usage conditions, such a slowdown has negligible impact for you (the user will not see it, the extra CPU cost does not imply buying a bigger server, and so on). This heavily depends on the operational context: what machines are involved, how many user authentications per second... so there is no one-size-fits-all response.

The wide picture goes thus:

- The time to verify a single password is v on your system. You can adjust this time by selecting the number of rounds in PBKDF2.
- A potential attacker can gather f times more CPU power than you (e.g. you have a single server, and the attacker has 100 big PC, each being twice faster than your server: this leads to f=200).
- The average user has a password of entropy n bits (this means that trying to guess a user password, with a dictionary of "plausible passwords", will take on average 2n-1 tries).
- The attacker will find your system worth attacking if the average password can be cracked in time less than p (that's the attacker's "patience").
- Your goal is to make the average cost to break a single password exceed the attacker patience, so that he does not even tries to, and goes on to concentrate on another, easier target. With the notations detailed above, this means that you want:

v·2<sup>n-1</sup> > f·p

p is beyond your control; it can be estimated with regards to the value of the data and systems protected by the user passwords. Let's say that p is one month (if it takes more than one month, the attacker will not bother trying). You can make f smaller by buying a bigger server; on the other hand, the attacker will try to make f bigger by buying bigger machines. An aggravating point is that password cracking is an [embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel) task, so the attacker will get a large boost by using [GPU which support general programming](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units); so a typical f will still range in the order of a few hundreds.

n relates to the quality of the passwords, which you can somehow influence through a strict password-selection policy, but realistically you will have a hard time getting a value of n beyond, say, 32 bits. If you try to enforce stronger passwords, users will begin to actively fight you, with workarounds such as reusing passwords from elsewhere, writing passwords on sticky notes, and so on.

So the remaining parameter is v. With f = 200 (an attacker with a dozen good GPU), a patience of one month, and n = 32, you need v to be at least 241 milliseconds (note: I initially wrote "8 milliseconds" here, which is wrong -- this is the figure for a patience of one day instead of one month). So you should set the number of rounds in PBKDF2 such that computing it over a single password takes at least that much time on your server. You will still be able to verify four passwords per second with a single core, so the CPU impact is probably negligible(*). Actually, it is safer to use more rounds than that, because, let's face it, getting 32 bits worth of entropy out of the average user password is a bit optimistic; on the other hand, not many attacks will devote dozens of PC for one full month to the task of cracking a single password, so maybe an "attacker's patience" of one day is more realistic, leading to a password verification cost of 8 milliseconds.

So you need to make a few benchmarks. Also, the above works as long as your PBKDF2/SHA-256 implementation is fast. For instance, if you use a fully C#/Java-based implementation, you will get the typical 2 to 3 slowdown factor (compared to C or assembly) for CPU-intensive tasks; in the notations above, this is equivalent to multiplying f by 2 or 3. As a comparison baseline, a 2.4 GHz Core2 CPU can perform about 2.3 millions of elementary SHA-256 computations per second (with a single core), so this would imply, on that CPU, about 20000 rounds to achieve the "8 milliseconds" goal.

(*) Take care that making password verification more expensive also makes your server more vulnerable to Denial-of-Service attacks. You should apply some basic countermeasures, such as temporarily blacklisting client IP addresses that send too many requests per second. You need to do that anyway, to thwart online dictionary attacks.

***

Original posting date: 2015 June 15