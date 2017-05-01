FROM arches/arches:latest
COPY . ${ARCHES_ROOT} 
COPY ./docker/entrypoint /docker/entrypoint


RUN dos2unix /docker/entrypoint/*