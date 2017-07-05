FROM arches/arches:latest

ENV PROJECT_ROOT=${ARCHES_ROOT}/cvast_arches/cvast_arches

RUN . ${WEB_ROOT}/ENV/bin/activate &&\
    pip install boto django-storages

COPY . ${ARCHES_ROOT} 
COPY ./docker/entrypoint /docker/entrypoint

WORKDIR ${PROJECT_ROOT}
RUN bower --allow-root install

RUN dos2unix /docker/entrypoint/*

# Set default workdir
WORKDIR ${ARCHES_ROOT}