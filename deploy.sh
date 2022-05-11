# echo "Switching to branch master"
# git checkout master

echo "Building app..."
npm run build

echo "Deploying file to server..."
scp -r dist/* root@10.221.23.249:/var/www/vpc/

echo "Done"
