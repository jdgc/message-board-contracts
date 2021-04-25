This is a quick proof of concept for a minimal censorship resistant message board dapp on EVM chains.

## Frontends

Frontend implementations transact with the contract primarily through the below methods

```
createThread(string) // text for original post content
postInThread(uint256, string) // threadId and post content
```

## What is has now
For now, not much. But the contract as is can:
- create threads
- post replies to threads
- emit events for above

## Potential extensions

Potential extensions could include
- reply to specific post
- thread titles
- support ipfs image attachments

## Why?

Some advantages of a dapp message board could be
- gas cost disintentivising bot activity while adding trivial hurdle for human users (using a low cost EVM chain such as polygon or fantom)
- message content not censorable on chain, only client side
- posts associated with origin address for trivial identity association while maintaining some level of personal anonymity
