############################################################
# Dockerfile to build Python WSGI Application Containers
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
From ubuntu

# File Author/ Maintainer
MAINTAINER Ben Pusey

ENV DEBIAN_FRONTEND noninteractive

RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update

# Install basic applications
RUN apt-get install -y tar git curl nano wget dialog net-tools build-essential

Run apt-get install -y nginx

# Install Python and Basic Python Tools
RUN apt-get install -y python python-dev python-distribute python-pip

# Install LDAP tools
RUN apt-get install -y libldap2-dev libsasl2-dev libssl-dev

Add . web_app

RUN cp /web_app/ws/etc/nginx/nginx.conf /etc/nginx/nginx.conf

#
RUN cp /web_app/ws/etc/scripts/runserver /usr/local/bin/ && chmod u+x,g+x /usr/local/bin/runserver
RUN cp /web_app/ws/etc/scripts/make_ssl_cert /usr/local/bin/ && chmod u+x,g+x /usr/local/bin/make_ssl_cert
RUN make_ssl_cert
RUN chmod -R +rx /web_app/ws/frontend/static/css && chmod -R +rx /web_app/ws/frontend/static/js/lib
# Get pip to download and install requirements
RUN pip install -r /web_app/ws/requirements.txt

# Expose ports
EXPOSE 80
EXPOSE 443

WORKDIR /web_app/ws
