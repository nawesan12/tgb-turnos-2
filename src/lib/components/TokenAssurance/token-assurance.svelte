<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userContext } from '../../../store/store';

	onMount(() => {
		const user = JSON.parse(localStorage.getItem('user-goro'));
		if (user.email && user.name) {
			userContext.set({ ...$userContext, user });
			return;
		}

		goto('/login');
	});
</script>
