FROM archesproject/arches:master

ENV CVAST_ARCHES_ROOT=${WEB_ROOT}/cvast_arches
ENV CVAST_ARCHES_APP=${CVAST_ARCHES_ROOT}/cvast_arches
ENV ENTRYPOINT_DIR=/docker/entrypoint

RUN . ${WEB_ROOT}/ENV/bin/activate &&\
    pip install boto django-storages

WORKDIR ${CVAST_ARCHES_APP}
ADD ./cvast_arches/cvast_arches/bower.json ${CVAST_ARCHES_APP}/bower.json
RUN bower --allow-root install

COPY ./cvast_arches ${CVAST_ARCHES_ROOT}
COPY ./docker/entrypoint /docker/entrypoint

RUN chmod -R 700 ${ENTRYPOINT_DIR} &&\
    dos2unix ${ENTRYPOINT_DIR}/*

# Set default workdir
WORKDIR ${CVAST_ARCHES_ROOT}