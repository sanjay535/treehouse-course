const Profile=require('./Profile.js');

const profile=new Profile('chalkers');

profile.on('end', console.log)

profile.on('error', console.error);