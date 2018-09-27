# K1

### Initialise Project

    composer install

### Develop

    gulp dev

### Deploy/Rollback

    php vendor/bin/dep deploy [stage]
    php vendor/bin/dep rollback [stage]

Server credentials are stored in the `~/.ssh/config` file. For example:

    Host domain.staging
    Hostname staging.domain.com
    Port 1122
    ForwardAgent true
    IdentityFile ~/.ssh/id_rsa
    UserKnownHostsFile /dev/null
    StrictHostKeyChecking no

    Host domain.production
    Hostname domain.com
    Port 1122
    ForwardAgent true
    IdentityFile ~/.ssh/id_rsa
    UserKnownHostsFile /dev/null
    StrictHostKeyChecking no
