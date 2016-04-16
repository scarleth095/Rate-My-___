echo "-------------------------------"
echo "| Remove the Previous Version |"
echo "-------------------------------"
docker rm abcss_ws_cntr

echo "-------------------"
echo "| Copy the Update |"
echo "-------------------"
docker build -t abcss .

echo "--------------------"
echo "| Run Contaner     |"
echo "--------------------"
docker run -it --name abcss_ws_cntr --link mongo_db:DB -p 200:443 abcss

echo "--------------------"
echo "| Run API Develop  |"
echo "--------------------"
runserver API Develop &

echo "--------------------"
echo "| Run Frontend     |"
echo "--------------------"
runserver Frontend Develop &

