import { MainProfile } from '@src/components/themes/dashboard/profile';
import { Metadata } from 'next/types';
export const metadata = { title: 'Profile Page' } satisfies Metadata;
export default function ProfilePage() {
    return <MainProfile />;
}