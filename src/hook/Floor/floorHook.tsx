import { floorService } from "@/services/floor.service";
import { useQuery } from "@tanstack/react-query";

export const useFloorData = () => {
    const { data: floorData, isLoading, error } = useQuery({queryKey:['newFloor'],queryFn:floorService.getFloor});
    return {floorData, isLoading, error}
  }