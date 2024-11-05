#!/bin/bash


npm install --legacy-peer-deps
npm run typeorm migration:run
npm run dev