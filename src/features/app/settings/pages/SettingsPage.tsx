import { AppCard } from '../../shared/components/AppCard'
import { PageHeader } from '../../shared/components/PageHeader'

const user = {
    name: 'Ayman Nasr',
    email: 'ayman.nasr@example.com',
    avatarUrl: '',
}

export function SettingsPage() {
    return (
        <div className="flex flex-col gap-8">
            <PageHeader
                title="Settings"
                subtitle="Manage your account preferences"
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <AppCard>
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-(--landing-border) bg-(--landing-background)/30 text-sm font-semibold text-(--landing-text)">
                            {user.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span aria-hidden="true">AN</span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="text-sm font-semibold text-(--landing-text)">
                                {user.name}
                            </div>
                            <div className="mt-1 truncate text-xs text-(--landing-muted)">
                                {user.email}
                            </div>
                            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-(--landing-border) bg-(--landing-background)/20 px-3 py-1 text-[11px] text-(--landing-subtle)">
                                Signed in
                            </div>
                        </div>
                    </div>
                </AppCard>

                <AppCard>
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="text-sm font-semibold text-(--landing-text)">
                                Account Details
                            </div>
                            <div className="mt-1 text-xs text-(--landing-muted)">
                                Your login information used across TestGen.
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <div className="text-[11px] text-(--landing-subtle)">
                                    Name
                                </div>
                                <div className="mt-1 rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 px-4 py-2 text-sm text-(--landing-text)">
                                    {user.name}
                                </div>
                            </div>
                            <div>
                                <div className="text-[11px] text-(--landing-subtle)">
                                    Email
                                </div>
                                <div className="mt-1 rounded-[12px] border border-(--landing-border) bg-(--landing-background)/20 px-4 py-2 text-sm text-(--landing-text)">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </AppCard>
            </div>
        </div>
    )
}
