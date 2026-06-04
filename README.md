# Sphinx

> The Frontend of the project ***T-RAG***

## Description

This project act as the frontend of the ***T-RAG***, it cares and only cares everything related to ***user experience / user interface***.

### Framework

This project is written in:

 - Vue
 - Vuetify
 - Anime.js
 - Material Design Icons

## Usage

### Project Manager

This project is written in `node.js` framework.

Hence, we can install all the dependencies using the following command:

> Make sure you had the `node.js` installed and `npm` added to system PATH.

```bash
npm i
```

### Preview

There comes three useful commands in ***Vite***, the first one is to create a preview server with ***hot-reload***, this is quite useful for debugging or designing.

The following command achieve this.

```bash
npm run dev
```

### Build

Due to out frontend project obey the rules of ***Frontend-Backend Seperated Architecture***, all the pages in this project should be static.

Therefore, we can generate the static ***HTML*** files using the following command:

```bash
npm run build
```

And to hold a temporary server showing those files, you can use the following command:

```bash
npm run preview
```
