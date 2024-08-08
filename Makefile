start:
	npm start

build:
	npm run build

download_dependencies:
	@echo [Downloading]: react-router-dom
	@npm install react-router-dom@latest --save

	@echo [Downloading]: react-hook-form
	@npm install react-hook-form@latest --save

	@echo [Downloading]: react-drop-zone
	@npm install react-drop-zone@latest --save

	@echo [Downloading]: framer-motion
	@npm install framer-motion@latest --save

	@echo [Downloading]: axios
	@npm install axios@latest --save

	@echo [Downloading]: react-pdf
	@npm i react-pdf@latest

	@echo [STATE]: Operation successful
