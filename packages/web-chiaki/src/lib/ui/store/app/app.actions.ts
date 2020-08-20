import { createAction } from '@vjcspy/web-ui';

export const ACTION_INIT_CHIAKI = 'ACTION_INIT_CHIAKI';

export const initChiaki = createAction<{ version: '1.0.0' }>(ACTION_INIT_CHIAKI, 'chiaki');
