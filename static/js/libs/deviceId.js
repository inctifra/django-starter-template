// Copyright 2026 liont
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
export function getDeviceId() {
  let deviceId = localStorage.getItem('re_device_id');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('re_device_id', deviceId);
    console.log('New device created:', deviceId);
  }

  return deviceId;
}
