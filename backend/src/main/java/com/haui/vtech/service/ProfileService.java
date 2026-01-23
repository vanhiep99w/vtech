package com.haui.vtech.service;

import com.haui.vtech.io.ProfileRequest;
import com.haui.vtech.io.ProfileResponse;

public interface ProfileService {

    ProfileResponse createProfile(ProfileRequest request);
}
