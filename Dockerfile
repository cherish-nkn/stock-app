FROM node:10
# root配下をdocker内にコピーします。
COPY . /home
 
WORKDIR /home
RUN yarn install

CMD [ "yarn", "run", "start"]