import { useQuery } from '@tanstack/react-query';
import { groupService } from '../../../services';

export const useGroups = () => {
  return useQuery({
    queryKey: ['groups', 'list'],
    queryFn: () => groupService.getUserGroups(),
  });
};
