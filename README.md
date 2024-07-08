# TL;DR
A mordern and fast Document Summarizer built using NextJS 14, TailwindCSS, NeonDB. Currently supports directly uploads of PDFs and PDF Links
## Tech Stack
1. NextJS 14
2. Tailwind CSS
3. NeonDB
4. Pinecone
5. Clerk
6. AWS Storage

## How to Install 
1. Fork and ⭐ the repository
2. Clone the repository using `git clone https://github.com/rishicds/TLDR.git`
3. Install the dependencies using `npm i`.
4. Fill the env as shown:
```
//clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
//neondb
DATABASE_URL=
//AWS
NEXT_PUBLIC_S3_ACCESS_KEY_ID=
NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=
NEXT_PUBLIC_S3_BUCKET_NAME=
//Pinecone
PINECONE_ENVIRONMENT=
PINECONE_API_KEY=
```
5. Run the project using `npm run dev`.
6. run `npx drizzle-kit push` to create schema and push to NeonDB.
* Note: Make sure you allow Public access on AWS S3 Bucket
* Set Bucket policy as :

* ```
    {"Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::{bucketName}/*"
        }
    ]}
* Setup CORS to allow your domain
