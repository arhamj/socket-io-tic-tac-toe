.PHONY: server
server:
	npm run build
	node build/server.js 5050

.PHONY: client
client:
	node client/client.js 127.0.0.1 5050