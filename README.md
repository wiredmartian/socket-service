## Paygate Bouncer

This service ensures that you don't miss the Paygate POST `Notify` data.

```xml 
<Redirect>
    <NotifyUrl>https://my.application.com/notify</NotifyUrl>
    <ReturnUrl>https://my.application.com/return</ReturnUrl>
</Redirect>
```

### NotifyUrl
This is the URL on your site that PayHost will post the final transaction result to. 
This attribute must only be passed if you intend to use PayHost with 3D Secure using PayGate’s MPI or PayHost redirect solution.
