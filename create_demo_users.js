import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const demoUsers = [
  {
    email: 'schooladmin@sarv.demo',
    password: 'demo_password_123',
    role: 'school_admin',
    full_name: 'Principal Sharma',
    school_id: 'SCH-001'
  },
  {
    email: 'transport@sarv.demo',
    password: 'demo_password_123',
    role: 'transport_coordinator',
    full_name: 'Coordinator Ramesh',
    school_id: 'SCH-001'
  },
  {
    email: 'driver@sarv.demo',
    password: 'demo_password_123',
    role: 'driver',
    full_name: 'Driver Ashok',
    assigned_bus: 'BUS-10A'
  },
  {
    email: 'parent@sarv.demo',
    password: 'demo_password_123',
    role: 'parent',
    full_name: 'Priya Patel',
    child_name: 'Aarav Patel',
    child_bus: 'BUS-10A'
  }
];

async function createUsers() {
  console.log('🚀 Starting demo user creation...');
  
  for (const user of demoUsers) {
    console.log(`\nCreating ${user.role} (${user.email})...`);
    
    // 1. Sign up the user in auth.users
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`⚠️ User ${user.email} already exists in Auth. Skipping auth creation.`);
        // Try logging in to get the UUID so we can insert the profile
        const { data: signInData } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: user.password
        });
        if (signInData?.user) {
          await insertProfile(signInData.user.id, user);
        }
      } else {
        console.error(`❌ Error creating auth user:`, authError.message);
      }
      continue;
    }

    if (authData?.user) {
      console.log(`✅ Auth user created with ID: ${authData.user.id}`);
      await insertProfile(authData.user.id, user);
    }
  }
  
  console.log('\n🎉 Finished creating all demo accounts!');
}

async function insertProfile(userId, user) {
  const profileData = {
    id: userId,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    ...(user.school_id && { school_id: user.school_id }),
    ...(user.assigned_bus && { assigned_bus: user.assigned_bus }),
    ...(user.child_name && { child_name: user.child_name }),
    ...(user.child_bus && { child_bus: user.child_bus })
  };

  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(profileData);

  if (profileError) {
    console.error(`❌ Error inserting profile for ${user.email}:`, profileError.message);
  } else {
    console.log(`✅ Profile data saved for ${user.role}.`);
  }
}

createUsers();
