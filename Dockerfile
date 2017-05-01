FROM arches/arches:latest
RUN . ${WEB_ROOT}/ENV/bin/activate &&\
    pip install boto django-storages
COPY . ${ARCHES_ROOT} 
COPY ./docker/entrypoint /docker/entrypoint
RUN dos2unix /docker/entrypoint/*