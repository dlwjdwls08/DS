import { useClassState, useDrawerState } from "@/store/store";
import { List, ListItem, SwipeableDrawer } from "@mui/material";

export default function teacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, open, close } = useDrawerState()
  const { classID, change } = useClassState()

  

	return (
		<>
			<SwipeableDrawer
			  anchor="left"
        open={isOpen}
        onClose={close}
        onOpen={open}>
        <List>
          
        </List>
			</SwipeableDrawer>
		</>
	)
}
