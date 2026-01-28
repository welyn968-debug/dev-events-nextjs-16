'use server'

import { PostHog } from 'posthog-node'

export async function myServerAction() {
    const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST
    })

    posthog.capture({
        distinctId: 'distinct_id_of_the_user',
        event: 'server_action_completed'
    })

    await posthog.shutdown()
}