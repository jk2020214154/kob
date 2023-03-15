scp dist/js/*.js Springboot:kob/acapp/
scp dist/css/*.css Springboot:kob/acapp/


ssh Springboot 'cd kob/acapp && ./rename.sh'

