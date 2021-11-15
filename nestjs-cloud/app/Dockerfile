FROM public.ecr.aws/a4g4f7i6/node-alpine:latest AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
# Required if not done in postinstall
# RUN npx prisma generate
RUN npm run test
RUN npm run test:e2e


COPY . .
RUN npm run build


FROM public.ecr.aws/a4g4f7i6/node-alpine:latest 

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]