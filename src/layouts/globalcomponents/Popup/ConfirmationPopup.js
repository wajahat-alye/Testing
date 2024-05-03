import { forwardRef, useImperativeHandle, useState } from "react";
import { Backdrop, Box, Button, DialogContent, Fade, Grid, Modal, Typography } from "@mui/material";
import { cancelBtnStyles, contentStyle, sybmitBtnStyles, dynamicMessageStyles } from "./styles";

const ConfirmationPopup = forwardRef(({ handleSubmit, message }: any, _ref) => {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		maxWidth: "25vw",
		borderRadius: "10px",
		height: "auto",
		width: "25vw",
		maxHeight: "35vh",
		bgcolor: "background.paper",
		boxShadow: 24,
		padding: "15px 0px",
	};

	const [state, setState] = useState({
		closeBtnPopup: false,
	});

	const toggleClosePopup = () => {
		setState((prevState) => ({
			...prevState,
			closeBtnPopup: !prevState.closeBtnPopup,
		}));
	};

	useImperativeHandle(_ref, () => ({
		getState: () => state,
		setState: () => {
			setState((prevState) => ({
				...prevState,
				closeBtnPopup: !prevState.closeBtnPopup,
			}));
		},
	}));

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={state.closeBtnPopup}
			onClose={toggleClosePopup}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={state.closeBtnPopup}>
				<Box sx={style}>
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							xs={12}
						>
							<DialogContent sx={contentStyle}>
								<Typography
									variant="h6"
									gutterBottom
									fontWeight={600}
								>
									Are you Sure?
								</Typography>
								<Typography
									variant="body2"
									sx={dynamicMessageStyles}
								>
									{message}
								</Typography>
								<Typography
									variant="caption"
									color="#798294"
								>
									Are you certain you wish to proceed?
								</Typography>
							</DialogContent>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						sx={{ padding: "10px 20px" }}
					>
						<Grid
							item
							xs={6}
						>
							<Button
								autoFocus
								variant="contained"
								sx={cancelBtnStyles}
								onClick={toggleClosePopup}
							>
								Cancel
							</Button>
						</Grid>
						<Grid
							item
							xs={6}
						>
							<Button
								autoFocus
								variant="contained"
								onClick={handleSubmit}
								sx={sybmitBtnStyles}
							>
								Confirm
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Fade>
		</Modal>
	);
});

export default ConfirmationPopup;
