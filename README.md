<p align="center"> 
    <img alt="zapoli" src="./src/views/assets/icon.png" width="150" height="150" />
</p>

<h1 align="center">
Modstr
</h1>
<h2 align="center">
Smart Moderation for the Nostr Protocol.
</h2>

<br/>

Modstr is a smart moderation service for the Nostr protocol. It analyzes, classifies, and labels Nostr events—including text notes and media—using LLMs. Modstr can be integrated with both relays and clients via HTTP and WebSocket interfaces, enabling automated moderation pipelines or in-app content safety features.


## ✨ Features

* ✅ **Event Classification Engine**
  Categorize events as `SAFE`, `WARNING`, or `HARMFUL` with detailed labels like `SPAM`, `INFORMATIVE`, `OFFENSIVE`, and more.

* 🤖 **AI-Powered Moderation**
  Use LLMs or custom rules to assess content safety, language, sentiment, or compliance.

* 🌐 **Relay + Client Friendly**
  Works with relays for moderation pipelines, or clients for in-app safety.


## 🛠️ Installation

```bash
git clone https://github.com/ZigBalthazar/mostr.git
cd mostr
npm install
```

## 🚀 Usage

> **Note**  
> 📘 Full API documentation is available on [Dezh Docs](https://docs.dezh.tech/docs/category/modstr).
> 


To analyze a Nostr event, simply make a `POST` request to the `/analyze` endpoint with a valid event payload:

### Example

```bash
curl -X POST 'http://{BASE_URL}/analyze' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "259bf57751b9d75da8d99eda9b3fb842a58c7310bc097e408ddbe1a2fdd29a2c",
    "sig": "60fcfecb23c779ef991415e976ebeaae47a8baaa945c70fb3b1672d82f5c2ab249b97c18756780f951bb17224a58589c27539fffbd117302b1eccf45afdf5807",
    "kind": 1,
    "tags": [],
    "pubkey": "bd4ae3e67e29964d494172261dc45395c89f6bd2e774642e366127171dfb81f5",
    "content": "It's getting complicated.",
    "created_at": 1748264568
  }'
```

### Sample Response

```json
{
  "success": true,
  "message": "Classification generated successfully.",
  "responseObject": {
    "event_id": "259bf57751b9d75da8d99eda9b3fb842a58c7310bc097e408ddbe1a2fdd29a2c",
    "status": "SAFE",
    "labels": ["OK", "INFORMATIVE"],
    "reason": "The text is a simple statement expressing a feeling or observation. It doesn't contain any harmful content."
  },
  "statusCode": 200
}
```

---

## 🌉 Integrating with Relays

### Strfry Integration

To integrate Modstr with relays using [Strfry](https://github.com/hoytech/strfry):

1. Use the Strfry plugin(ts) available in the `/plugin` directory.
2. Refer to the [Strfry plugin documentation](https://github.com/hoytech/strfry/blob/master/docs/plugins.md) for setup instructions.


## 📖 Labels & Statuses

**Statuses:**

* `SAFE`
* `WARNING`
* `HARMFUL`

**Labels:**

```json
[
  "OK", "INFORMATIVE", "FRIENDLY", "OFFENSIVE", "SPAM", "MISLEADING",
  "SENSITIVE", "PROFANITY", "HATEFUL", "VIOLENT", "SEXUAL", "SELF_HARM",
  "DANGEROUS", "NSFW", "AI_GENERATED", "UNVERIFIED", "LANGUAGE_UNKNOWN"
]
```


## 📚 Roadmap

* [ ] Language detection integration
* [ ] Local model support (e.g., Ollama, Llama.cpp)
* [ ] NIP-90 data vending machine integration
* [ ] Websocket interface integration
* [ ] Event suggestion service (based on user following and liked events)
* [ ] Full moderation with integration to a web of trust service


## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests.


## 📄 License

MIT
