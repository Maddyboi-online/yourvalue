# YourValue Resume Builder - Setup Instructions

This guide will help you set up the YourValue resume builder application with Supabase backend integration.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is sufficient)
- Git installed

## Step 1: Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd hello-new-web
npm install
```

## Step 2: Set Up Supabase

### 2.1 Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign in with GitHub or create an account
4. Click "New Project"
5. Choose your organization
6. Enter project name: `yourvalue-resume-builder`
7. Enter a database password (save it securely)
8. Choose a region closest to your users
9. Click "Create new project"

### 2.2 Get Your Supabase Credentials

Once your project is ready:

1. Go to Project Settings → API
2. Copy the **Project URL** 
3. Copy the **anon public key**

### 2.3 Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy this and replace with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:** Never commit your `.env.local` file to version control. Make sure it's in your `.gitignore`.

## Step 3: Set Up Database Tables

### 3.1 Enable Row Level Security (RLS)

Go to your Supabase project:
1. Navigate to Authentication → Settings
2. Enable "Enable Row Level Security (RLS)"

### 3.2 Create the Resumes Table

Go to the Supabase SQL Editor (Project → SQL Editor) and run this SQL:

```sql
-- Create the resumes table
create table resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  title text default 'My Resume',
  data jsonb,
  is_public boolean default false,
  share_slug text unique,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Enable RLS on the resumes table
alter table resumes enable row level security;

-- Create policy: Users can manage their own resumes
create policy "Users can manage own resumes"
on resumes for all
using (auth.uid() = user_id);

-- Create policy: Public resumes viewable by all
create policy "Public resumes viewable by all"
on resumes for select
using (is_public = true);

-- Create index for better performance on share_slug
create index on resumes (share_slug);
```

### 3.3 Set Up Authentication

1. Go to Authentication → Settings
2. Configure your Site URL: `http://localhost:3000` (for development)
3. For production, use your actual domain
4. Enable the providers you want:
   - **Email**: Enable for email/password authentication
   - **Google**: Enable for Google OAuth (requires setup in Google Cloud Console)

## Step 4: Configure Google OAuth (Optional)

If you want Google authentication:

### 4.1 Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Go to APIs & Services → Credentials
4. Click "Create Credentials" → "OAuth client ID"
5. Select "Web application"
6. Add authorized redirect URI: `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
7. Copy the Client ID and Client Secret

### 4.2 Configure in Supabase

1. Go to Supabase → Authentication → Providers
2. Enable Google provider
3. Enter your Google Client ID and Secret
4. Add authorized redirect URI: `http://localhost:3000` (for development)

## Step 5: Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Step 6: Test the Application

### 6.1 Authentication Test
1. Click "Login" or "Build Free" button
2. Sign up with email or Google
3. Verify you can access the dashboard

### 6.2 Resume Builder Test
1. Go to `/builder`
2. Fill in resume details
3. Verify auto-save functionality
4. Click "Preview My Resume"

### 6.3 Template Test
1. In preview page, try different templates
2. Free users should only see Classic template
3. Pro templates should show lock icons

### 6.4 Sharing Test
1. Make a resume public in the builder
2. Copy the sharing link
3. Test the public link in an incognito window

### 6.5 Dark/Light Mode Test
1. Click the theme toggle button in header
2. Verify the theme changes persist

## Troubleshooting

### Common Issues

**Error: "No rows returned" when loading resume**
- Check if the resume is set to public
- Verify the share slug is correct
- Check RLS policies are correctly configured

**Error: "User not found" when trying to access protected routes**
- Check if user is logged in
- Verify middleware is correctly configured
- Check Supabase authentication is working

**Build errors related to Supabase**
- Ensure `.env.local` file exists with correct values
- Check if Supabase packages are installed: `npm install @supabase/supabase-js @supabase/ssr`

**Template rendering issues**
- Check if template components are properly exported
- Verify template prop passing in preview page

### Environment Variables Check

Run this to verify your environment variables are loaded:

```bash
npm run build
```

If you see errors about missing Supabase URL/key, check your `.env.local` file.

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your Vercel account to the GitHub repository
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Domain Configuration

1. Update your Site URL in Supabase Authentication settings
2. Update redirect URIs for OAuth providers
3. Update CORS settings if needed

## Features Implemented

✅ **User Authentication**: Email and Google OAuth
✅ **Resume Management**: Create, edit, save, and delete resumes
✅ **Multiple Templates**: 4 professional templates (Classic, Modern, Minimal, Creative)
✅ **Public Sharing**: Share resumes with unique URLs
✅ **Dark/Light Mode**: Theme toggle with persistence
✅ **Auto-save**: Real-time saving to Supabase
✅ **Toast Notifications**: User feedback for all actions
✅ **Responsive Design**: Mobile-friendly interface
✅ **Progress Tracking**: Form completion indicator
✅ **Character Counts**: Input validation and feedback

## Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Ensure all environment variables are set
4. Check the SQL tables are created correctly

For additional help, refer to the [Supabase Documentation](https://supabase.com/docs).
