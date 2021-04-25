# board-contracts
This is a quick proof of concept for a minimal censorship resistant message board dapp on EVM chains.

## Frontends

Frontend implementations transact with the contract primarily through the below methods

```
createThread(string) // text for original post content
postInThread(uint256, string) // threadId and post content
```

## Potential extensions

Potential extensions could include
- reply to specific post
- thread titles
- support ipfs image attachments
