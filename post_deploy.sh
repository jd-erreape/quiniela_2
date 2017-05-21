#! /bin/bash
source ~/.bash_profile

cd $CURRENT_PATH

# Create symlinks from shared folder
ln -s $SHARED_PATH shared
ln -s $SHARED_PATH/.env .env

# npm install using proper node verion
nvm use v7.10.0
npm install
